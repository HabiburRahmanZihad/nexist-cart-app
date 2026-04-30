"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface FeatureItemProps {
  name: string;
  value: string;
  position: string;
}

interface LightningProps {
  hue?: number;
  xOffset?: number;
  speed?: number;
  intensity?: number;
  size?: number;
}

const Lightning: React.FC<LightningProps> = ({
  hue = 235,
  xOffset = 0,
  speed = 1,
  intensity = 1,
  size = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const vertexShaderSource = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform float uHue;
      uniform float uXOffset;
      uniform float uSpeed;
      uniform float uIntensity;
      uniform float uSize;

      #define OCTAVE_COUNT 10

      vec3 hsv2rgb(vec3 c) {
          vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
          return c.z * mix(vec3(1.0), rgb, c.y);
      }

      float hash11(float p) {
          p = fract(p * .1031);
          p *= p + 33.33;
          p *= p + p;
          return fract(p);
      }

      float hash12(vec2 p) {
          vec3 p3 = fract(vec3(p.xyx) * .1031);
          p3 += dot(p3, p3.yzx + 33.33);
          return fract((p3.x + p3.y) * p3.z);
      }

      mat2 rotate2d(float theta) {
          float c = cos(theta);
          float s = sin(theta);
          return mat2(c, -s, s, c);
      }

      float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 fp = fract(p);
          float a = hash12(ip);
          float b = hash12(ip + vec2(1.0, 0.0));
          float c = hash12(ip + vec2(0.0, 1.0));
          float d = hash12(ip + vec2(1.0, 1.0));
          vec2 t = smoothstep(0.0, 1.0, fp);
          return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);
      }

      float fbm(vec2 p) {
          float value = 0.0;
          float amplitude = 0.5;
          for (int i = 0; i < OCTAVE_COUNT; ++i) {
              value += amplitude * noise(p);
              p *= rotate2d(0.45);
              p *= 2.0;
              amplitude *= 0.5;
          }
          return value;
      }

      void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
          vec2 uv = fragCoord / iResolution.xy;
          uv = 2.0 * uv - 1.0;
          uv.x *= iResolution.x / iResolution.y;
          uv.x += uXOffset;
          uv += 2.0 * fbm(uv * uSize + 0.8 * iTime * uSpeed) - 1.0;
          float dist = abs(uv.x);
          vec3 baseColor = hsv2rgb(vec3(uHue / 360.0, 0.7, 0.8));
          vec3 col = baseColor * pow(mix(0.0, 0.07, hash11(iTime * uSpeed)) / dist, 1.0) * uIntensity;
          col = pow(col, vec3(1.0));
          fragColor = vec4(col, 1.0);
      }

      void main() {
          mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `;

    const compileShader = (source: string, type: number): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const iResolutionLocation = gl.getUniformLocation(program, "iResolution");
    const iTimeLocation = gl.getUniformLocation(program, "iTime");
    const uHueLocation = gl.getUniformLocation(program, "uHue");
    const uXOffsetLocation = gl.getUniformLocation(program, "uXOffset");
    const uSpeedLocation = gl.getUniformLocation(program, "uSpeed");
    const uIntensityLocation = gl.getUniformLocation(program, "uIntensity");
    const uSizeLocation = gl.getUniformLocation(program, "uSize");

    const startTime = performance.now();
    let animId: number;

    const render = () => {
      resizeCanvas();
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(iResolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(iTimeLocation, (performance.now() - startTime) / 1000.0);
      gl.uniform1f(uHueLocation, hue);
      gl.uniform1f(uXOffsetLocation, xOffset);
      gl.uniform1f(uSpeedLocation, speed);
      gl.uniform1f(uIntensityLocation, intensity);
      gl.uniform1f(uSizeLocation, size);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animId = requestAnimationFrame(render);
    };
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animId);
    };
  }, [hue, xOffset, speed, intensity, size]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

const FeatureItem: React.FC<FeatureItemProps> = ({ name, value, position }) => (
  <div className={`hidden md:block absolute ${position} z-10 group transition-all duration-300 hover:scale-110`}>
    <div className="flex items-center gap-2 relative">
      <div className="relative">
        <div className="w-2 h-2 bg-white rounded-full group-hover:animate-pulse" />
        <div className="absolute -inset-1 bg-white/20 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="text-white relative">
        <div className="font-medium group-hover:text-white transition-colors duration-300">{name}</div>
        <div className="text-white/70 text-sm">{value}</div>
        <div className="absolute -inset-2 bg-white/10 rounded-lg blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      </div>
    </div>
  </div>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const FEATURES = [
  { name: "48+ Products", value: "curated selection", position: "left-0 lg:left-10 top-36" },
  { name: "Free Shipping", value: "on orders $100+", position: "left-[22%] top-20" },
  { name: "30-Day Returns", value: "hassle-free", position: "right-[22%] top-20" },
  { name: "4.8★ Rating", value: "10K+ customers", position: "right-0 lg:right-10 top-36" },
];

export function HeroOdyssey() {
  const [lightningHue] = useState(235);

  return (
    <div className="relative w-full h-svh bg-black text-white overflow-hidden">
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-full flex flex-col">
        {/* Feature items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full z-10 relative md:top-[28%] md:flex-1"
        >
          {FEATURES.map((f) => (
            <motion.div key={f.name} variants={itemVariants}>
              <FeatureItem name={f.name} value={f.value} position={f.position} />
            </motion.div>
          ))}
        </motion.div>

        {/* Main hero content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-30 flex flex-col items-center text-center max-w-4xl mx-auto flex-1 md:flex-none justify-center md:justify-start pb-8 md:pb-16"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-full text-xs sm:text-sm mb-4 sm:mb-6 border border-white/10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>New arrivals — 48+ premium products</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light mb-2 tracking-tight">
            Nexist
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="text-lg sm:text-2xl md:text-3xl lg:text-4xl pb-3 font-light bg-linear-to-r from-gray-100 via-gray-200 to-gray-300 bg-clip-text text-transparent"
          >
            Premium Shopping Experience
          </motion.h2>

          <motion.p variants={itemVariants} className="text-gray-400 text-sm sm:text-base mb-7 sm:mb-9 max-w-2xl px-2">
            Discover a curated collection of premium products — electronics, fashion, home, sports, and books.
            Every item handpicked for quality and value.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full px-2">
            <Link
              href="/products"
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-black text-sm sm:text-base font-medium rounded-full hover:bg-white/90 transition-colors"
            >
              Shop All Products
            </Link>
            <Link
              href="/collections"
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors border border-white/20 text-sm sm:text-base"
            >
              Browse Collections
            </Link>
          </motion.div>

          {/* Mobile feature stats */}
          <motion.div variants={itemVariants} className="md:hidden grid grid-cols-2 gap-2 w-full max-w-xs mt-6">
            {FEATURES.map((f) => (
              <div key={f.name} className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2 backdrop-blur-sm border border-white/10">
                <div className="w-1.5 h-1.5 bg-white rounded-full shrink-0" />
                <div className="text-left">
                  <div className="text-white text-xs font-medium leading-tight">{f.name}</div>
                  <div className="text-white/60 text-xs">{f.value}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 rounded-full bg-linear-to-b from-blue-500/20 to-purple-600/10 blur-3xl" />
        <div className="absolute top-0 w-full left-1/2 -translate-x-1/2 h-full">
          <Lightning hue={lightningHue} xOffset={0} speed={1.6} intensity={0.6} size={2} />
        </div>
        <div className="z-10 absolute top-[55%] left-1/2 -translate-x-1/2 w-150 h-150 backdrop-blur-3xl rounded-full bg-[radial-gradient(circle_at_25%_90%,#1e386b_15%,#000000de_70%,#000000ed_100%)]" />
      </motion.div>
    </div>
  );
}

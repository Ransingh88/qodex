import { motion } from "motion/react"
import React from "react"
import "./home.css"

const Home = () => {
  const rows = 20
  const cols = 30
  const cellSize = 40

  const blocks = []

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const visible = Math.random() > 0.8

      if (visible) {
        blocks.push(
          <motion.div
            key={`${x}-${y}`}
            className="absolute bg-border-muted/60"
            style={{
              top: `${y * cellSize}px`,
              left: `${x * cellSize}px`,
              width: `${cellSize}px`,
              height: `${cellSize}px`,
            }}
            animate={{
              opacity: [0.1, 0.5, 0.2, 0.6, 0.1],
            }}
            transition={{
              duration: Math.random() * 4 + 2, // 2s to 6s
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        )
      }
    }
  }
  return (
    <div className="home-main_container">
      <div
        className="absolute -top-50 left-1/2 -translate-x-1/2  w-2/3 h-full bg-[linear-gradient(var(--color-grid-pattrn)_1px,transparent_1px),linear-gradient(to_right,var(--color-grid-pattrn)_1px,transparent_1px)] 
              bg-[size:40px_40px] opacity-70 mask-x-from-70% mask-x-to-90% mask-y-from-60% mask-y-to-90% pointer-events-none z-0"
      >
        {blocks}
      </div>
      <div className="home-container container-guttered  z-10">
        <div className="home-hero_section relative">
          <h1 className="home-hero_title">
            We love solving problems. <br /> But, what if there was a platform
            that <br /> helped you master them all?
          </h1>
          <p className="home-hero_motivation">
            From brute force to brilliance — Daily coding, real-world patterns,
            and structured learning — all in one smart platform built <br /> for
            ambitious developers. Learn deeper. Code like a pro. Introducing you
            to Qodex, AI powred code platform.
          </p>
          <div className="home-hero_action_buttons">
            <button className="home-hero_explore">Explore</button>
            <button className="home-hero_cta">Get started</button>
          </div>
          {/* <div className="absolute inset-0 left-32 flex flex-col items-start justify-around">
            <div className="h-10 w-10 rounded-xl bg-basebg-default border border-border-default shadow-xl flex items-center justify-center font-semibold text-sm text-amber-300 ">
              JS
            </div>
            <div className="h-10 w-10 rounded-xl bg-basebg-default border border-border-default shadow-xl flex items-center justify-center font-semibold text-sm text-blue-300 absolute -left-15 ">
              Py
            </div>
            <div className="h-10 w-10 rounded-xl bg-basebg-default border border-border-default shadow-xl flex items-center justify-center font-semibold text-sm text-red-300 ">
              Java
            </div>
          </div>
          <div className="h-full absolute top-0 right-32 flex flex-col items-center justify-around">
            <div className="h-10 w-10 rounded-xl bg-basebg-default border border-border-default shadow-xl flex items-center justify-center font-semibold text-sm text-amber-300 right-10">
              Vu
            </div>
            <div className="h-10 w-10 rounded-xl bg-basebg-default border border-border-default shadow-xl flex items-center justify-center font-semibold text-sm text-blue-300 absolute left-15">
              Node
            </div>
            <div className="h-10 w-10 rounded-xl bg-basebg-default border border-border-default shadow-xl flex items-center justify-center font-semibold text-sm text-red-300 ">
              Swift
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Home

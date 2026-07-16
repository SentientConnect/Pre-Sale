{/* Glasses product display */}
<div className="relative min-h-[430px] lg:min-h-[620px]">
  {/* Ambient glow behind the product */}
  <div
    aria-hidden="true"
    className="absolute left-1/2 top-1/2 z-0 h-[70%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#bb7d1d]/10 blur-[120px]"
  />

  {/* Rotating rings */}
  <motion.div
    aria-hidden="true"
    animate={reduceMotion ? undefined : { rotate: 360 }}
    transition={{
      duration: 34,
      repeat: Infinity,
      ease: 'linear',
    }}
    className="absolute left-1/2 top-1/2 z-0 h-[74%] w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d5ad53]/15"
  />

  <motion.div
    aria-hidden="true"
    animate={reduceMotion ? undefined : { rotate: -360 }}
    transition={{
      duration: 46,
      repeat: Infinity,
      ease: 'linear',
    }}
    className="absolute left-1/2 top-1/2 z-0 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#d5ad53]/10"
  />

  {/* Product image */}
  <motion.div
    style={{ y: imageY }}
    className="absolute inset-0 z-20 flex items-center justify-center"
  >
    <motion.div
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -12, 0],
            }
      }
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="relative w-[118%] max-w-[860px] lg:w-[130%]"
    >
      <div
        className="relative aspect-[3/2] w-full overflow-hidden"
        style={{
          WebkitMaskImage:
            'radial-gradient(ellipse 79% 74% at 56% 53%, black 50%, rgba(0,0,0,.98) 64%, rgba(0,0,0,.65) 77%, rgba(0,0,0,.2) 89%, transparent 100%)',
          maskImage:
            'radial-gradient(ellipse 79% 74% at 56% 53%, black 50%, rgba(0,0,0,.98) 64%, rgba(0,0,0,.65) 77%, rgba(0,0,0,.2) 89%, transparent 100%)',
        }}
      >
        <Image
          src="/Glasses_edit.png"
          alt="SentientOS AR glasses with the official phoenix logo"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="select-none object-cover object-[56%_54%] brightness-[0.88] contrast-[1.12]"
        />

        {/* Covers the extra phoenix baked into the top-left corner */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 5% 5%, #020202 0%, #020202 10%, rgba(2,2,2,.98) 17%, rgba(2,2,2,.78) 24%, rgba(2,2,2,.3) 33%, transparent 44%)',
          }}
        />

        {/* Blends the image edges into the page */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, #020202 0%, transparent 13%, transparent 88%, #020202 100%), linear-gradient(to bottom, #020202 0%, transparent 14%, transparent 86%, #020202 100%)',
            opacity: 0.8,
          }}
        />
      </div>
    </motion.div>
  </motion.div>

  {/* Human layer card */}
  <div className="absolute bottom-4 right-2 z-30 rounded-2xl border border-[#d5ad53]/20 bg-black/55 px-4 py-3 backdrop-blur-md">
    <p className="text-[0.62rem] uppercase tracking-[0.22em] text-[#d5ad53]">
      Human Layer
    </p>

    <p className="mt-1 text-sm text-white/70">
      Always in control
    </p>
  </div>
</div>

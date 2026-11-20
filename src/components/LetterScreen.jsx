import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Images, MailOpen, Sparkles } from 'lucide-react'
import { Button } from './ui/button'
import Sunflower from './Sunflower'
import Butterfly from './Butterfly'
import { cn } from '../lib/utils'

/* The letter — exactly as written for Hashy 💛 */
const LETTER_PARAGRAPHS = [
  'සමහර මිනිස්සු ජීවිතේට එන්නේ ලොකු සද්ද බද්ද නැතුව, ඒත් ආවට පස්සේ මුළු ලෝකෙම වෙනස් කරලා දානවා. ඔයා මගේ ජීවිතේට ආවෙත් හරියට ඒ වගේමයි. කිසිම බොරුවක් නැති, හරිම සැහැල්ලු, ඒ තරමටම ගැඹුරු හැඟීමක් ඔයා ළඟ තියෙනවා.',
  'අද ඔයාගේ දවස. මට ඕනේ ඔයාට ගොඩක් ලොකු දේවල් කියන්න නෙවෙයි, සරලවම කිව්වොත් ඔයා හැමදාමත් ඔය විදිහටම සතුටින්, හිනාවෙලා ඉන්නවා දකින්න තමයි මට ඕනේ. ඔයාගේ හිතේ තියෙන හැම හීනයක්ම, හැම බලාපොරොත්තුවක්ම ලස්සනටම ඉටුවෙන්න කියලා හදවතින්ම ප්‍රාර්ථනා කරනවා.',
  'වචන ගොඩකින් හැමදේම කියන්න බැරි වුණත්, මගේ හිතේ ඔයා වෙනුවෙන් තියෙන තැන, ඒ ගෞරවය සහ ආදරය කවදාවත් අඩු වෙන්නේ නෑ.',
  'තවත් ලස්සන අවුරුද්දකට, අලුත් මතක ගොඩකට සුබම සුබ උපන්දිනයක්! ❤️',
]

/* Polaroid collage scattered softly behind the letter */
const COLLAGE = [
  { src: '/images/image2.png', className: 'left-[-1rem] top-[8%] -rotate-12 sm:left-[4%]', size: 'w-20 sm:w-28' },
  { src: '/images/image7.png', className: 'right-[-0.8rem] top-[14%] rotate-12 sm:right-[4%]', size: 'w-20 sm:w-28' },
  { src: '/images/image3.png', className: 'left-[2%] bottom-[22%] rotate-6 sm:left-[8%]', size: 'w-16 sm:w-24' },
  { src: '/images/image12.png', className: 'right-[2%] bottom-[26%] -rotate-6 sm:right-[9%]', size: 'w-16 sm:w-24' },
  { src: '/images/image22.png', className: 'left-[16%] top-[38%] rotate-3 hidden md:block', size: 'w-28' },
  { src: '/images/image18.png', className: 'right-[15%] top-[44%] -rotate-3 hidden md:block', size: 'w-28' },
]

/** Chapter 3 — the sealed love letter, floating over a memory collage. */
export default function LetterScreen({ onNext }) {
  const [opened, setOpened] = useState(false)

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-[#FFF3D6] via-[#FFE4A8] to-[#F7BE54]">
      {/* Memory collage backdrop */}
      <div aria-hidden="true" className="absolute inset-0">
        {COLLAGE.map((c, i) => (
          <img
            key={i}
            src={c.src}
            alt=""
            loading="lazy"
            decoding="async"
            draggable={false}
            className={cn(
              'absolute select-none rounded-lg border-[5px] border-white/90 object-cover opacity-30 shadow-polaroid blur-[1.2px]',
              'aspect-[3/4]',
              c.size,
              c.className
            )}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF3D6]/70 via-[#FFE4A8]/55 to-[#F7BE54]/70" />
      </div>

      <Butterfly size={36} top="12%" duration={22} delay={1} hue="rose" />
      <Butterfly size={28} top="70%" duration={25} delay={7} hue="white" />

      <div className="thin-scroll relative z-10 flex h-full w-full items-center justify-center overflow-y-auto px-3 pb-28 pt-6 sm:px-6">
        <AnimatePresence mode="wait" initial={false}>
          {!opened ? (
            /* ---------- Sealed envelope ---------- */
            <motion.div
              key="envelope"
              exit={{ opacity: 0, scale: 0.7, y: -60, transition: { duration: 0.45 } }}
              className="flex flex-col items-center text-center"
            >
              <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.32em] text-deep sm:text-xs">
                <MailOpen size={15} strokeWidth={2.6} /> Chapter Three · The Letter <MailOpen size={15} strokeWidth={2.6} />
              </p>
              <h2 className="font-script mt-2 text-5xl leading-tight text-bark sm:text-7xl">A Letter for You</h2>
              <p className="font-sinhala mt-1 text-sm font-semibold text-cocoa/80 sm:text-lg">ළමයෝ, මේ ඔයාට විශේෂ ලිපියක් 💌</p>

              {/* Envelope */}
              <motion.button
                onClick={() => setOpened(true)}
                aria-label="Open the letter"
                className="group relative mt-8 outline-none sm:mt-12"
                whileHover={{ scale: 1.05, rotate: -1 }}
                whileTap={{ scale: 0.96 }}
              >
                <div className="animate-float relative h-44 w-64 sm:h-56 sm:w-96">
                  {/* body */}
                  <div className="absolute inset-0 rounded-2xl border border-deep/40 bg-gradient-to-b from-[#FFFDF4] to-[#F4E3BB] shadow-paper" />
                  {/* flap */}
                  <div
                    className="absolute left-0 top-0 h-[58%] w-full rounded-t-2xl border border-deep/40 bg-gradient-to-b from-[#F7E8C4] to-[#EAD49C] transition-transform duration-500 group-hover:-translate-y-2"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 50% 96%)' }}
                  />
                  {/* side folds */}
                  <div className="absolute bottom-0 left-0 h-[62%] w-1/2 rounded-bl-2xl border-r border-deep/20 bg-gradient-to-br from-[#FFF8E0]/90 to-[#EAD9AC]/90" style={{ clipPath: 'polygon(0 100%, 0 0, 100% 100%)' }} />
                  <div className="absolute bottom-0 right-0 h-[62%] w-1/2 rounded-br-2xl bg-gradient-to-bl from-[#FFF8E0]/90 to-[#EAD9AC]/90" style={{ clipPath: 'polygon(100% 100%, 100% 0, 0 100%)' }} />
                  {/* wax heart seal */}
                  <div className="absolute left-1/2 top-[44%] z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-[#FF7A93] to-[#C2255C] shadow-[0_6px_18px_rgba(194,37,92,0.45),inset_0_2px_4px_rgba(255,255,255,0.6)] ring-2 ring-[#8F1B40]/50 transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">
                    <Heart size={30} fill="#FFE3EA" strokeWidth={1.4} className="text-[#8F1B40]" />
                  </div>
                  {/* address */}
                  <p className="absolute bottom-3 left-0 right-0 text-center font-script text-xl text-cocoa/75 sm:bottom-5 sm:text-2xl">
                    For Hashy 💛
                  </p>
                </div>
              </motion.button>

              <Button size="lg" className="mt-8 sm:mt-12" onClick={() => setOpened(true)}>
                <Heart size={22} fill="currentColor" /> Open the Letter
              </Button>
            </motion.div>
          ) : (
            /* ---------- The letter itself ---------- */
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 90, rotate: 2 }}
              animate={{ opacity: 1, y: 0, rotate: -0.4 }}
              transition={{ type: 'spring', stiffness: 120, damping: 17 }}
              className="relative w-full max-w-2xl"
            >
              {/* Paper card */}
              <div className="paper-lines relative overflow-hidden rounded-2xl border border-cocoa/15 bg-paper shadow-paper">
                {/* Sticky tape */}
                <div aria-hidden="true" className="absolute -top-2 left-6 h-6 w-24 rotate-[-4deg] rounded-sm bg-sunflower/70 shadow-sm sm:left-10 sm:w-28" />
                <div aria-hidden="true" className="absolute -top-2 right-6 h-6 w-24 rotate-[5deg] rounded-sm bg-sunflower/70 shadow-sm sm:right-10 sm:w-28" />
                {/* Sunflower sticker */}
                <div className="absolute -right-4 -top-4 rotate-12 sm:-right-6 sm:-top-6">
                  <Sunflower size={74} />
                </div>

                <div className="px-5 pb-5 pt-9 sm:px-10 sm:pb-7 sm:pt-12">
                  <p className="flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-[0.34em] text-honey sm:text-[10px]">
                    <Sparkles size={12} /> A Letter From My Heart <Sparkles size={12} />
                  </p>
                  <h2 className="font-sinhala mt-2 text-center text-lg font-bold leading-snug text-deep sm:text-2xl">
                    Happy Birthday, ළමයෝ... 🎂✨
                  </h2>

                  {/* Divider */}
                  <div aria-hidden="true" className="mt-2 flex items-center gap-3 px-6">
                    <span className="h-px flex-1 bg-gradient-to-r from-transparent via-honey to-transparent" />
                    <Sunflower size={18} />
                    <span className="h-px flex-1 bg-gradient-to-r from-transparent via-honey to-transparent" />
                  </div>

                  {/* Scrollable body */}
                  <div className="letter-scroll mt-3 max-h-[36vh] space-y-3 sm:max-h-[40vh] overflow-y-auto pr-2 lg:max-h-[50vh]">
                    {LETTER_PARAGRAPHS.map((p, i) => (
                      <p
                        key={i}
                        className="font-sinhala text-[13.5px] font-medium leading-7 text-[#43301d] sm:text-[15px] sm:leading-8"
                      >
                        {p}
                      </p>
                    ))}
                    <p className="font-sinhala pt-1 text-right text-base font-semibold text-[#c2255c] sm:text-lg">
                      හැමදාමත් ... 💕
                    </p>
                  </div>
                </div>
              </div>

              {/* Next CTA */}
              <div className="mt-4 flex justify-center sm:mt-6">
                <Button size="lg" onClick={onNext} aria-label="Continue to our memories gallery">
                  Next — Our Memories <Images size={24} strokeWidth={2.1} />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

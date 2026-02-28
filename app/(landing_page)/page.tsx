"use client"
import images from "../assets/images/images"
export default function page() {
  return (
    <div>
      {/* HERO SECTION */}
      <section className={`w-screen h-screen px-parent-margin py-6 bg-[url(${images.hero_sec_bg})]`}>
        <h2 className="font-semibold">
          Ise Timer
        </h2>
      </section>
      <section className="w-screen h-screen px-parent-margin py-6 bg-background">
        <h4 className=" capitalize font-semibold mb-6">
          how it works
        </h4>
        <div className=" w-full flex items-stretch justify-center gap-4">
          {new Array(4).fill(0).map((_)=>(
            <div className="flex-1 min-h-32 bg-black"></div>
          ))}
        </div>
      </section>
    </div>
  )
}
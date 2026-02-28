import Image from "next/image";
import { PropsWithChildren } from "react";
import Images from "../assets/images/images";
export default function layout({children}:PropsWithChildren) {
  return (
    <div className="flex gap-0 items-center justify-center w-full h-screen">
      <div className="w-full flex-1 flex flex-col gap-6 justify-center-safe items-center-safe h-fit max-h-full overflow-auto hide-scroller px-parent-margin py-6">
        <div className="w-fit mx-auto">
          <Image src="/logo.png" alt="ise timer logo" width={80} height={80} />
        </div>
        <div className="flex-1 space-y-6 w-full">
          {children}
        </div>
      </div>
      <div className="flex-1 max-sm:hidden h-fit">
        <Image alt="authentication page banner" src={Images.hero_sec_bg} className="w-full aspect-square spotlight object-cover object-center" />
      </div>
    </div>
  )
}
import { PropsWithChildren } from "react";

export default function layout({children}: PropsWithChildren) {
  
  return (
    <div className="w-full h-full max-h-full overflow-auto flex flex-col items-center justify-center-safe gap-6">
        <>
            {children}
        </>
    </div>
  )
}
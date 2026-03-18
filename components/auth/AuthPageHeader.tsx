
type Props = {
    title:string;
    subtitle?:string;
    className?:string;
}

export default function AuthPageHeader({title, className="", subtitle}: Props) {
  return (
    <div className={`${className} text-center`}>
      <h3 className="high-emphasis-text font-semibold">{title}</h3>
      {subtitle && (<p className="medium-emphasis-text">{subtitle}</p>)}
    </div>
  )
}
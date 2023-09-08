import getImageUrl from "../helpers/getImageUrl";

export default function Layout({ children }) {
    return (
        <div className="fixed inset-x-0 top-0 h-screen">
            <picture>
                <source media="(min-width: 1200px)" srcSet={getImageUrl('background', '1200-bg')} />
                <source media="(min-width: 768px)" srcSet={getImageUrl('background', '810-bg')} />
                <img src={getImageUrl('background', '375-bg')} alt="Image description" className="w-full h-full object-cover" />
            </picture>

            {<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-5 max-w-[400px] pb-10">
                {children}
            </div>}
        </div>
    )
}

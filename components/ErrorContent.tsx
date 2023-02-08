export default function ErrorContent({title, msg}: { title?: string, msg?: string }) {
    return (
        <div role="alert" className={"self-center justify-self-center shadow rounded-xl mb-10"}>
            <div className="bg-red-600 text-white font-bold rounded-t-xl px-4 py-2">
                Error
            </div>
            <div className="border border-t-0 border-red-600 rounded-b-xl bg-red-100 px-4 py-3 text-red-700">
                {msg}
            </div>
        </div>
    )
}
export default function InputField({ label, register, name, type = "text", rules }) {
    return (
        <div className="flex flex-col w-full gap-2">
            <input
                type={type}
                placeholder={label}
                className="pl-4 py-3 bg-gray-100 text-black rounded-xl w-full"
                {...register(name, rules)}
            />
            {errors[name] && (
                <p className="text-red-500 text-sm">errors[name].message</p>
            )}
        </div>
    )
}
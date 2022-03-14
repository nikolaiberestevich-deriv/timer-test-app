import { useState, ChangeEvent } from "react";
import ShowTimer from './ShowTimer';

const Main = () => {

    const [lastSeen, SetPrintedTime] = useState<number | undefined>()

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget) {
            SetPrintedTime(+e.currentTarget.value)
        }
    }

    return <>
        Please, enter a past date in unix timestamp format
        <input type="number" value={lastSeen || ""} onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)} />
        {(lastSeen || lastSeen === 0) && <ShowTimer lastSeen={lastSeen} />}
    </>
}

export default Main;
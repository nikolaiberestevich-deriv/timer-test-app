import { useState, useEffect } from "react";

enum WhatToShow {
    seconds30 = "SECONDS30",
    seconds60 = "SECONDS60",
    minutes = "MINUTES",
    empty = ""
}

type ShowTimerProps = { lastSeen: number }
type ShownTimerType = {
    showItem: WhatToShow.empty | WhatToShow.seconds30 | WhatToShow.seconds60 | WhatToShow.minutes,
    secondsBetween: number
}

const getTimeDifference = (lastSeen: number) => ~~((+new Date() - lastSeen * 1000) / 1000)

const ShowTimer = ({ lastSeen }: ShowTimerProps) => {

    const [shownTimer, SetShownTimer] = useState<ShownTimerType>({
        showItem: WhatToShow.empty,
        secondsBetween: getTimeDifference(lastSeen)
    })

    useEffect(() => {
        let secInterval = setInterval(() => {
            if (getTimeDifference(lastSeen) < 30) {
                SetShownTimer({
                    showItem: WhatToShow.seconds30,
                    secondsBetween: getTimeDifference(lastSeen)
                })
            } else if (getTimeDifference(lastSeen) < 60 && shownTimer.showItem !== WhatToShow.seconds60) {
                SetShownTimer({
                    showItem: WhatToShow.seconds60,
                    secondsBetween: getTimeDifference(lastSeen)
                })
            } else if (getTimeDifference(lastSeen) > 59 && shownTimer.showItem !== WhatToShow.minutes) {
                SetShownTimer({
                    showItem: WhatToShow.minutes,
                    secondsBetween: getTimeDifference(lastSeen)
                })
            }
        }, 1000);

        let minuteInterval = setInterval(() => {
            if (shownTimer.secondsBetween > 59) {
                SetShownTimer({
                    showItem: WhatToShow.minutes,
                    secondsBetween: getTimeDifference(lastSeen)
                })
            }
        }, 60000);
        return () => {
            clearInterval(minuteInterval)
            clearInterval(secInterval)
        }
    }, [shownTimer, lastSeen])

    const isMinuteUpdate = shownTimer.showItem === WhatToShow.minutes
    const isSecondsUpdate = shownTimer.showItem === WhatToShow.seconds60 || shownTimer.showItem === WhatToShow.seconds30
    const realTimeDifference = getTimeDifference(lastSeen)

    return <>
        {realTimeDifference < 0
            ? "the date is from the future"
            : <>
                {isSecondsUpdate && <>{`${realTimeDifference} seconds ago`}</>}
                {isMinuteUpdate && <>{`${(realTimeDifference / 60) ^ 0} minutes ago`}</>}
            </>
        }
    </>
}

export default ShowTimer;
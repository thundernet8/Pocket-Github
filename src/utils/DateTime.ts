import moment from "moment";

export const getTimeDiff = (
    targetTime: moment.Moment,
    sourceTime?: moment.Moment
) => {
    targetTime = targetTime.utcOffset(0);
    sourceTime = sourceTime || moment().utcOffset(0);
    const tail = targetTime < sourceTime ? " ago" : " after";
    const seconds = Math.abs(
        Number(
            ((targetTime.valueOf() - sourceTime.valueOf()) / 1000).toFixed(0)
        )
    );

    if (seconds < 60) {
        return "moment ago";
    }

    if (seconds < 3600) {
        return Math.floor(seconds / 60).toString() + " minutes " + tail;
    }

    if (seconds < 3600 * 24) {
        return Math.floor(seconds / 3600).toString() + " hours " + tail;
    }

    if (seconds < 3600 * 24 * 7) {
        return Math.floor(seconds / (3600 * 24)).toString() + " days " + tail;
    }

    return targetTime.format("YYYY-MM-DD HH:mm");
};

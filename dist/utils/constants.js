"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeLimitInSecond = exports.SERVICES = void 0;
exports.SERVICES = {
    GATEWAY_SESSION_MANAGER: "GATEWAY_SESSION_MANAGER",
};
const getTimeLimitInSecond = (timeLimit) => {
    const length = timeLimit.length;
    const unit = timeLimit.at(length - 1);
    const value = Number.parseInt(timeLimit.slice(0, length - 1)) * 1000;
    switch (unit) {
        case "S":
            return value;
        case "M":
            return value * 60;
        case "H":
            return value * 3600;
    }
};
exports.getTimeLimitInSecond = getTimeLimitInSecond;
//# sourceMappingURL=constants.js.map
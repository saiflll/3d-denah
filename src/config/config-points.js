import { whrm } from './points/whrm.js';
import { whfg } from './points/whfg.js';
import { mdcw } from './points/mdcw.js';
import { iqf } from './points/iqf.js';
import { pc, ukLine, dmLine, anLine, mieLine } from './points/lines.js';
import { mixing, chilled, hotRoom } from './points/rooms.js';
import { boiler, workshop, qclab, machineRunHours } from './points/support.js';

export const staticCells = [
    { fromRow: 66, toRow: 66, fromCol: 1, toCol: 99, height: 3.2, color: "#334155" },
    { fromRow: 5, toRow: 5, fromCol: 1, toCol: 99, height: 3.2, color: "#334155" },
    { fromRow: 5, toRow: 66, fromCol: 1, toCol: 1, height: 3.2, color: "#334155" },
    { fromRow: 5, toRow: 66, fromCol: 99, toCol: 99, height: 3.2, color: "#334155" }
];

export const sitePoints = [
    whfg,
    mdcw,
    iqf,
    pc,
    ukLine,
    dmLine,
    anLine,
    mieLine,
    mixing,
    chilled,
    hotRoom,
    whrm,
    boiler,
    workshop,
    qclab,
    machineRunHours
];

export const chartPresets = sitePoints;


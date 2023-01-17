import {loadSliders} from "./slider.js";
import {updateStickyHeader} from "./sticky_header.js";

document.addEventListener("DOMContentLoaded", loadSliders);
document.addEventListener("scroll", updateStickyHeader);

import { containerWidthEncoder } from "../container-width-encoder.js";

// Create encoder and listen to elements with attribute of data-cq (also the default)
const encoder = containerWidthEncoder("[data-cq]");

// Start encoding
encoder.start();

import "./index.css";

import embed from "vega-embed";
import { PlotWindow } from "./plot.ts";

let plot = new PlotWindow();
window.plot = plot;

const spec: any = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description: "A simple bar chart with embedded data.",
  data: {
    values: [
      { a: "A", b: 28 },
      { a: "B", b: 55 },
      { a: "C", b: 43 },
      { a: "D", b: 91 },
      { a: "E", b: 81 },
      { a: "F", b: 53 },
      { a: "G", b: 19 },
      { a: "H", b: 87 },
      { a: "I", b: 52 },
    ],
  },
  mark: "bar",
  encoding: {
    x: { field: "a", type: "nominal", axis: { labelAngle: 0 } },
    y: { field: "b", type: "quantitative" },
  },
  transform: [{ filter: "datum.b > minT" }],
  params: [
    {
      name: "minT",
      value: 50,
    },
  ],
  width: 600,
  height: 600,
};

const result = await embed("#vis", spec, {
  actions: false,
});
const view = result.view;

// console.log(view);

const getSelectedValues = (selectedElement: HTMLSelectElement) => {
  let selectedValues = [];
  const options = selectedElement.options;
  for (let i = 0; i < options.length; i++) {
    if (options[i].selected) {
      selectedValues.push(options[i].value);
    }
  }
  return selectedValues;
};

document.getElementById("txsensors")!.addEventListener("change", (e) => {
  console.log(getSelectedValues(e.target as HTMLSelectElement));
  requiresRender = true;
});

// TODO think about how we can get plot selection and multiple plots

let requiresRender = false;
let isRerendering = false;

async function rerender() {
  // console.log("check rerender");
  if (isRerendering || !requiresRender) return;
  console.log("rerender");

  requiresRender = false;
  isRerendering = true;

  try {
    await view.runAsync();
  } catch (error) {
    console.error("Error during vega renderer:", error);
  } finally {
    isRerendering = false;
  }
}

setInterval(rerender, 100);

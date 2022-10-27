import { App } from "vue";
import  Split from "./components/split.vue";
import  SplitArea from "./components/split-area.vue";

export const split = Split
export const splitArea = SplitArea

export default {
  install(app: App): void {
    app.component("Split", split);
    app.component("SplitArea", splitArea);
  }
};

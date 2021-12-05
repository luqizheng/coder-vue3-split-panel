import { App } from "vue";
import Split from "./components/split.vue";
import SplitArea from "./components/split-area.vue";

export default {
  install(app: App): void {
    app.component("Split", Split);
    app.component("SplitArea", SplitArea);
  },
};

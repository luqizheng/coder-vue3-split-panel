<template>
  <div class="split" ref="parent">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Split from "split.js";
import {
  defineComponent,
  ref,
  onMounted,
  SetupContext,
  VNode,
  
} from "vue";
interface IDataContainer {
  instance: Split.Instance | null;
  elements: Array<any> | undefined;
  sizes: Array<number> | undefined;
  minSizes: Array<number> | undefined;
}

export default defineComponent({
  emits: ["onDrag", "onDragStart", "onDragEnd"],
  props: {
    direction: { type: String, default: "horizontal" },
    gutterSize: { type: Number, default: 8 },
  },

  setup(props, ctx: SetupContext) {
    const parent = ref(null);
    var dataVal = {
      elements: new Array<any>(),
      sizes: new Array<number>(),
      minSizes: new Array<number>(),
      instance: null,
    };

    const data = ref(dataVal as IDataContainer);
  
    const init = () => {
      if (data.value.instance !== null) {
        data.value.instance?.destroy();
      }
      data.value.instance = null;

      var splitOptions = {
        direction: props.direction || "horizontal",
        sizes: data.value.sizes || 50,
        minSize: data.value.minSizes || 100,
        gutterSize: props.gutterSize || 8,
        cursor: props.direction === "horizontal" ? "col-resize" : "row-resize",
        onDrag: function () {
          ctx.emit("onDrag", data.value.instance?.getSizes());
        },
        onDragStart: function () {
          ctx.emit("onDragStart", data.value.instance?.getSizes());
        },
        onDragEnd: function () {
          ctx.emit("onDragEnd", data.value.instance?.getSizes());
        },
      };
    
      data.value.instance = Split(
        data.value.elements ?? [],
        splitOptions as Split.Options
      );
    };
    onMounted(() => {
      data.value.elements = [];
      data.value.sizes = [];
      data.value.minSizes = [];
      var parentVal = parent.value as unknown as HTMLElement;

      if (parentVal) {
        for (var i = 0; i < parentVal.children.length; i++) {
          var child = parentVal.children[i];
          data.value.elements.push(child);
        }
      }
      if (ctx.slots.default) {
        ctx.slots.default()?.forEach((vnode: VNode) => {
          var vodeType = vnode.type as any;
          console.log(vodeType.name);

          if (vodeType.name == "SplitArea") {
            if (vnode.props) {
              var a = vnode.props as {
                size: number;
                minSize: number;
              };
              data.value.sizes?.push(a.size);
              data.value.minSizes?.push(a.minSize);
            }
          }
        });
      }
      init();
    });

    const reset = () => {
      init();
    };
    const getSizes = () => {
      return data.value.instance?.getSizes() || 0;
    };

    return { data, init, parent, reset, getSizes };
  },
});
</script>

 <style>
.split {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  width: 100%;
}
.gutter {
  background-color: #eee;
  background-repeat: no-repeat;
  background-position: 50%;
}
.gutter.gutter-horizontal {
  cursor: col-resize;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==");
}
.gutter.gutter-vertical {
  cursor: row-resize;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=");
}
.split.split-horizontal,
.gutter.gutter-horizontal {
  height: 100%;
  float: left;
}
</style>


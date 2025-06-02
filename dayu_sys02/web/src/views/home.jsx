import { defineComponent, ref } from 'vue';
import { ElTree } from 'element-plus';

export default defineComponent({
  setup() {
    const data = ref([
      {
        id: 1,
        label: 'Level one 1',
        children: [
          {
            id: 2,
            label: 'Level two 1-1',
          },
        ],
      },
    ]);

    const handleNodeClick = (data) => {
      console.log('Node clicked:', data);
    };

    const handleCheckChange = (data, checked, indeterminate) => {
      console.log('Checked changed:', data, checked, indeterminate);
    };

    return () => (
      <ElTree
        data={data.value}
        node-key="id"
        props={{ label: 'label', children: 'children' }}
        show-checkbox
        default-expand-all
        check-on-click-node={false}
        check-on-click-leaf={false}
        onNodeClick={handleNodeClick}
        onCheckChange={handleCheckChange}
      />
    );
  },
});



//点击 选中框 才勾选中,点击 文字 不勾选中

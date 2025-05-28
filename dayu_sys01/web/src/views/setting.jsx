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
                check-on-click-node={false}  // 👈 关键点：关闭点击节点文字勾选
                onNodeClick={handleNodeClick}
                onCheckChange={handleCheckChange}
            />
        );
    },
});

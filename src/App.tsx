import { useEffect, useState } from "react";
import { Node } from "./components/node";
import { getTree } from "./server/requests/get";
import { TreeNode } from "./server/types";
import { createTreeNode } from "./server/requests/create";
import { deleteTreeNode } from "./server/requests/delete";
import { renameTreeNode } from "./server/requests/rename";
import { InfoIcon } from "./components/icons/InfoIcon";

function App() {
    const [tree, setTree] = useState<TreeNode>();
    useEffect(() => {
        if (tree) return;
        fetchTree();
    });

    const fetchTree = async () => {
        setTree(await getTree());
    };

    const handleCreate = async (name: string, parent?: TreeNode) => {
        if (!tree) return false;

        await createTreeNode(tree.name, name, parent?.id ?? tree.id);
        await fetchTree();
        return true;
    };

    const handleRename = async (nodeId: number, newName: string) => {
        if (!tree) return false;

        const result = await renameTreeNode(tree.name, nodeId, newName);
        await fetchTree();
        return !result;
    };

    const handleDelete = async (nodeId: number) => {
        if (!tree) return false;

        await deleteTreeNode(tree.name, nodeId);
        await fetchTree();
        return true;
    };

    return (
        <main>
            <div>
                {tree && (
                    <Node
                        node={tree}
                        isRoot={true}
                        onCreate={handleCreate}
                        onRename={handleRename}
                        onDelete={handleDelete}
                    />
                )}
            </div>

            <section>
                <InfoIcon />
                <p>
                    Добавлять и удалять ноды можно посредством кнопок "плюс" и "корзина", которые находятся справа от
                    нод.
                </p>
            </section>
            <section>
                <InfoIcon />
                <p>
                    Переименовывать ноды можно обычным кликом на название ноды – затем редактируя текст как в обычном
                    поле ввода. Сохранение нового имени ноды происходит после расфокуса. Если переименовать не удалось –
                    имя ноды откатывается. Корневую ноду переименовать нельзя.
                </p>
            </section>
        </main>
    );
}

export default App;

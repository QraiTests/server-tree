import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { TreeNode } from "../../server/types";
import { NodeIcon } from "../icons/NodeIcon";
import { PlusIcon } from "../icons/PlusIcon";
import { Modal } from "../modal";
import styles from "./index.module.scss";
import { DeleteIcon } from "../icons/DeleteIcon";

interface NodeProps {
    node: TreeNode;
    isRoot: boolean;
    parentNode?: TreeNode;

    onCreate: (name: string, parent?: TreeNode) => Promise<boolean>;
    onRename: (nodeId: number, newName: string) => Promise<boolean>;
    onDelete: (nodeId: number) => Promise<boolean>;
}

export function Node({ node, isRoot, parentNode, ...hooks }: NodeProps) {
    const handleRename = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const newName = e.target.value;
        // Undo
        if (newName.trim().length < 1) {
            e.target.value = node.name;
            return;
        }

        hooks.onRename(node.id, e.target.value).then((result) => {
            // Undo if not renamed actually
            if (!result) {
                e.target.value = node.name;
                return;
            }

            node.name = e.target.value;
        });
    };

    const [addNodeVisible, setAddNodeVisible] = useState<boolean>(false);
    const [newNodeName, setNewNodeName] = useState<string>("");
    const handleAdd = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        hooks.onCreate(newNodeName, parentNode);
        setAddNodeVisible(false);
    };

    const [toDeleteNode, setToDeleteNode] = useState<TreeNode>();
    const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
        if (!toDeleteNode) return;
        e.preventDefault();

        hooks.onDelete(toDeleteNode.id);
        setToDeleteNode(undefined);
    };

    return (
        <div className={styles.node}>
            <header>
                <NodeIcon />
                {!isRoot ? <input defaultValue={node.name} onBlur={handleRename} /> : <p>{node.name}</p>}

                <button onClick={() => setAddNodeVisible(true)}>
                    <PlusIcon />
                </button>
                {!isRoot && (
                    <button onClick={() => setToDeleteNode(node)}>
                        <DeleteIcon />
                    </button>
                )}
            </header>

            {!!node.children?.length && (
                <section>
                    {node.children.map((childNode) => (
                        <Node key={childNode.id} node={childNode} parentNode={node} isRoot={false} {...hooks} />
                    ))}
                </section>
            )}

            <Modal visible={addNodeVisible} onVisibleChange={setAddNodeVisible}>
                <p>Добавить ноду</p>

                <form onSubmit={handleAdd}>
                    <input
                        placeholder="Введите название ноды"
                        minLength={4}
                        required
                        value={newNodeName}
                        onInput={(e) => setNewNodeName((e.target as HTMLInputElement).value)}
                    />
                    <button type="submit">Добавить</button>
                </form>
            </Modal>
            <Modal visible={!!toDeleteNode} onVisibleChange={() => setToDeleteNode(undefined)}>
                <p>Действительно удалить ноду "{toDeleteNode?.name}"?</p>

                <button type="button" onClick={handleDelete}>
                    Удалить
                </button>
            </Modal>
        </div>
    );
}

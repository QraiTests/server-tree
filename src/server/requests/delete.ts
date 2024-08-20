import { fetchApi } from "../fetchApi";
import { TreeNode } from "../types";

export async function deleteTreeNode(treeName: string, nodeId: number): Promise<TreeNode> {
    return await fetchApi(`/api.user.tree.node.delete?treeName=${treeName}&nodeId=${nodeId}`, {
        method: "post",
    });
}

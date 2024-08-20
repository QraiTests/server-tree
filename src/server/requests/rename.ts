import { fetchApi } from "../fetchApi";
import { TreeNode } from "../types";

export async function renameTreeNode(treeName: string, nodeId: number, newNodeName: string): Promise<TreeNode> {
    return await fetchApi(
        `/api.user.tree.node.rename?treeName=${treeName}&nodeId=${nodeId}&newNodeName=${newNodeName}`,
        {
            method: "post",
        }
    );
}

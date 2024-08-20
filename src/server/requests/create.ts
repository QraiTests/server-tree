import { fetchApi } from "../fetchApi";
import { TreeNode } from "../types";

export async function createTreeNode(treeName: string, nodeName: string, parentNodeId: number): Promise<TreeNode> {
    return await fetchApi(
        `/api.user.tree.node.create?treeName=${treeName}&parentNodeId=${parentNodeId}&nodeName=${nodeName}`,
        {
            method: "post",
        }
    );
}

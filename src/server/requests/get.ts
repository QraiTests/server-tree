import { fetchApi } from "../fetchApi";
import { TreeNode } from "../types";

const TREE_UUID = "e3718281-de35-48ff-b444-0017e89c7116";

export async function getTree(): Promise<TreeNode> {
    return await fetchApi(`/api.user.tree.get?treeName=${TREE_UUID}`);
}

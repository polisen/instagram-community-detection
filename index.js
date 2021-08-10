import { getFollowers, getFollowing, getUser} from "./getUsers.js";
import {Graph} from './graph/index.js'


async function main() {
    const graph = new Graph();
    const username = 'mfluder69'
    const user = await getUser({username, type: 'brief'})
    console.log(user)
    // const following = await getFollowing(username);
    // console.table(following)
    // const graph = new Graph()
    // console.log(graph)
}

main()
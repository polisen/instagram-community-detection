import { getFollowers, getFollowing, getUser} from "./getUsers.js";
import {Graph} from './graph/index.js'


async function main() {
    const graph = new Graph();
    const username = 'm3gatech'
    const user = await getUser({username, type: 'brief'})
    graph.addVertex(user)
    const following = await getFollowing(username);
    // const followers = await getFollowers(username);
    graph.addMultipleVertices(following)
    graph.printVertices()
    // console.log(graph.findVertexBy({key: 'username', value: 'schackedelic'}))
    
    // graph.print()
    // console.log(user)
    // const following = await getFollowing(username);
    // console.table(following)
    // const graph = new Graph()
    // console.log(graph)
}

main()
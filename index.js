import { getFollowers, getFollowing, getUser} from "./getUsers.js";
import {Graph} from './UserGraph.js'


const graph = new Graph();

function createRelationshipsBetween(user, userList, param){
    /**
     * Add edges between node and nodes if they exist in graph.
     * @param {string} user - the user to connect everyone else to.
     * @param {array} userList - the users to connect to user.
     * @param {string} param - the parameter to search by.
     */

    // 
}




async function main() {
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
import {IgApiClient} from 'instagram-private-api'
import dotenv from 'dotenv'
dotenv.config()
const ig = new IgApiClient();
ig.state.generateDevice(process.env.IG_USERNAME);
await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);


export const getFollowers = async (username) => {
  await ig.simulate.preLoginFlow();

  const id = await ig.user.getIdByUsername(username);
  const followersFeed = await ig.feed.accountFollowers(id);
  const wholeResponse = await followersFeed.request();
  // Feed is stateful and auto-paginated. Every subsequent request returns results from next page
  let followers = wholeResponse.users.map(
    ({ pk, username, full_name, is_private }) => {
      return { pk, username, full_name, is_private };
    }
  );
  // console.log({followers})
  while (followersFeed.isMoreAvailable()) {
    let items = await followersFeed.items();
    let newItems = items.map(({ pk, username, full_name, is_private }) => {
      return { pk, username, full_name, is_private };
    });
    // console.log(newItems)
    followers.push(...newItems);
  }
  console.log(followers.length);
  return followers;
  // console.log(Object.keys(wholeResponse))
  // console.log(followersFeed.isMoreAvailable())

  // console.log(id)
  // let items = await followersFeed.items();
  // items.forEach(({pk, username}) => console.log({pk, username}))
  // console.log(items.length)
  // console.log(items)

  //   console.log(items); // Here you can reach items. It's array.
};

export const getFollowing = async (username) => {
    await ig.simulate.preLoginFlow();
    const id = await ig.user.getIdByUsername(username);
    const followersFeed = await ig.feed.accountFollowing(id);
    const wholeResponse = await followersFeed.request();

    let following = wholeResponse.users.map(
      ({ pk, username, full_name, is_private }) => {
        return { pk, username, full_name, is_private };
      }
    );

    while (followersFeed.isMoreAvailable()) {
      let items = await followersFeed.items();
      let newItems = items.map(({ pk, username, full_name, is_private }) => {
        return { pk, username, full_name, is_private };
      });
      following.push(...newItems);
    }
    console.log(following.length);
    return following;

}

export const getUser = async ({username, type = 'full'}) => {
  await ig.simulate.preLoginFlow();
  const id = await ig.user.getIdByUsername(username);
  const info = await ig.user.info(id)
  console.log(Object.keys(info))
  switch (type) {
    case 'brief':
      const {pk, username, full_name, is_private} = info;
      return {pk, username, full_name, is_private}
    case 'full':
      return info;
    default:
      return info;
  }
}
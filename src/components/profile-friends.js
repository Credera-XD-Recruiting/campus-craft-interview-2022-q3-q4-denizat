import { removeChildNodes } from "../utils";

/**
 * Function which generates a single list-item node based on a dataset
 *
 * @param {object} data data containing attributes of a listItem
 * @return {Node} generated markup for a card
 */
const generateListItemNode = (data) => {
  const { avatarSrc, name, jobTitle, companyName, topFriend } = data;
  const templateId = "friend-list-item-template";
  const resultCardTemplate = document.getElementById(templateId);
  const clone = document.importNode(resultCardTemplate.content, true);
  const nameNode = clone.querySelector("p.page-paragraph");
  const titleNode = clone.querySelector("p.page-micro");
  const avatarNode = clone.querySelector(".profile-list-item-avatar");

  nameNode.innerHTML = `${name} ${topFriend ? "❤️" : ""}`;
  titleNode.innerHTML = `${jobTitle} @ ${companyName}`;
  avatarNode.src = avatarSrc;
  avatarNode.setAttribute("aria-label", `${name}`);

  if (avatarSrc) {
    const avatarImg = document.createElement("img");
    avatarImg.src = avatarSrc;
    avatarImg.setAttribute("aria-label", `${name}`);
    avatarNode.appendChild(avatarImg);
  }

  return clone;
};

const sortLastName = (a, b) => {
  return a.split(" ")[1] < b.split(" ")[1] ? -1 : 1;
};

/**
 * Function which accepts the JSON results from the API, and uses HTML templates
 * to generate the markup needed for the results list
 *
 * @param {object} resultsData JSON payload of results
 */
export const generateFriendsListFromTemplate = (resultsData) => {
  const friendsListSection = document.querySelector(
    "#profile-friends .profile-friends-list"
  );

  resultsData.friends.sort((a, b) => {
    if (a.topFriend && b.topFriend) {
      return sortLastName(a.name, b.name);
    } else {
      if (a.topFriend) return -1;
      else if (b.topFriend) return 1;
      else return sortLastName(a.name, b.name);
    }
  });

  if (resultsData.friends && resultsData.friends.length > 0) {
    removeChildNodes(friendsListSection);

    for (let i = 0; i < resultsData.friends.length; i++) {
      const friendsNode = generateListItemNode(resultsData.friends[i]);
      friendsListSection.appendChild(friendsNode);
    }
  }
};

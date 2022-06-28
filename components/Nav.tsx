import Image from "next/image";
import React, { lazy } from "react";
import { useMoralis } from "react-moralis";
import { useStore } from "../store";

function Nav() {
  const { isAuthenticated, user, removeUser } = useStore();

  const { logout } = useMoralis();

  const renderAuthenticatedNav = () => {
    return <></>;
  };

  const logoutPress = async () => {
    console.log("logout");
    await logout();
    removeUser();
  };

  console.log("user :>> ", user);
  // return (
  //   <div className="navbar bg-base-300 px-8">
  //     <div className="flex-1">
  //       <a className="btn btn-ghost normal-case text-xl">Moralis-login</a>
  //     </div>
  //     <div className="flex-none">
  //       <ul className="menu menu-horizontal p-0">
  //         <li tabIndex={0}>
  //           <a>
  //             {user?.user?.attributes?.username}
  //             <svg
  //               className="fill-current"
  //               xmlns="http://www.w3.org/2000/svg"
  //               width="20"
  //               height="20"
  //               viewBox="0 0 24 24"
  //             >
  //               <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
  //             </svg>
  //           </a>
  //           <ul className="p-2 bg-base-100">
  //             <li className="float-right">
  //               <a>eth-add - {user?.user?.attributes?.ethAddress}</a>
  //             </li>
  //             <li onClick={logoutPress} className="border-2">
  //               <a> Logout </a>
  //             </li>
  //           </ul>
  //         </li>
  //         {/* <li>
  //           <a>Item 3</a>
  //         </li> */}
  //       </ul>
  //     </div>
  //   </div>
  // );

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Moralis - login</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end ">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full ">
              {/* <img src="https://api.lorem.space/image/face?hash=33791" /> */}
              <Image
                alt="avatar"
                width={50}
                height={50}
                src={`https://avatars.dicebear.com/api/pixel-art-neutral/${user?.user?.attributes?.ethAddress}.svg`}
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="border-2 menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-72"
          >
            <li>
              <a className="text-violet-300">
                {user?.user?.attributes?.username}
              </a>
            </li>
            <li onClick={logoutPress}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Nav;

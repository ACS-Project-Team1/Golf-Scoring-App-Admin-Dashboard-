import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdOutlineGolfCourse,
  MdEvent,
  MdHome,
  MdFileCopy,
  MdOutlineCloudUpload,
  MdOutlineFeedback,
  MdManageAccounts,
  MdLogin,
} from "react-icons/md";
import { RiTeamLine } from "react-icons/ri";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
// Auth Imports
import SignInCentered from "views/auth/signIn";
import SignUp from "views/auth/signUp";
import HelpFeedback from "views/admin/rtl";
import Help from "views/admin/rtl";
import EditProfile from "components/navbar/EditProfile";
import TeamManagement from "views/admin/marketplace";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "/default",
    icon: (
      <Icon
        as={MdOutlineGolfCourse}
        width="20px"
        height="20px"
        color="green.700"
      />
    ),
    component: MainDashboard,
  },
  {
    name: "Team Management",
    layout: "/admin",
    path: "/team-management",
    icon: <Icon as={RiTeamLine} width="20px" height="20px" color="green.700" />,
    component: TeamManagement,
    secondary: true,
  },
  {
    name: "Event Management",
    layout: "/admin",
    icon: <Icon as={MdEvent} width="20px" height="20px" color="green.700" />,
    path: "/event-management",
    component: DataTables,
  },
  {
    name: "Handicap Score",
    layout: "/admin",
    path: "/handicap-score",
    icon: <Icon as={RiTeamLine} width="20px" height="20px" color="green.700" />,
    component: NFTMarketplace,
    secondary: true,
    hidden: true,
  },
  {
    name: "Tournament",
    layout: "/admin",
    path: "/tournament",
    icon: <Icon as={RiTeamLine} width="20px" height="20px" color="green.700" />,
    component: NFTMarketplace,
    secondary: true,
    hidden: true,
  },
  {
    name: "Statistics",
    layout: "/admin",
    path: "/statistics",
    icon: <Icon as={RiTeamLine} width="20px" height="20px" color="green.700" />,
    component: NFTMarketplace,
    secondary: true,
    hidden: true,
  },
  {
    name: "CSV Data Upload",
    layout: "/admin",
    path: "/csv-upload",
    icon: (
      <Icon
        as={MdOutlineCloudUpload}
        width="20px"
        height="20px"
        color="green.700"
      />
    ),
    component: Profile,
  },
  {
    name: "Reports",
    layout: "/admin",
    path: "/reports",
    icon: <Icon as={MdFileCopy} width="20px" height="20px" color="green.700" />,
    component: Profile,
    hidden: true,
  },
  {
    name: "Users",
    layout: "/admin",
    path: "/nft-marketplace",
    icon: <Icon as={RiTeamLine} width="20px" height="20px" color="green.700" />,
    component: NFTMarketplace,
    secondary: true,
    hidden: true,
  },
  {
    name: "Help and Feedback",
    layout: "/admin",
    path: "/help",
    icon: (
      <Icon
        as={MdOutlineFeedback}
        width="20px"
        height="20px"
        color="green.700"
      />
    ),
    component: Help,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLogin} width="20px" height="20px" color="green.700" />,
    component: SignInCentered,
    hidden: true,
  },
  {
    name: "Sign Up",
    layout: "/auth",
    path: "/sign-up",
    icon: (
      <Icon
        as={MdManageAccounts}
        width="20px"
        height="20px"
        color="green.700"
      />
    ),
    component: SignUp,
    hidden: true,
  },
  {
    name: "Edit Profile",
    layout: "/admin",
    path: "/editProfile",
    icon: (
      <Icon
        as={MdOutlineFeedback}
        width="20px"
        height="20px"
        color="green.700"
      />
    ),
    component: EditProfile,
    hidden: true,
  },
];

export default routes;

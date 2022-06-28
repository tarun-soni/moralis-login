import styles from "../styles/Home.module.css";
import Head from "./api/components/Head";
import Link from "next/link";
import FileUpload from "../components/FileUpload";
import ImageCard from "../components/ImageCard";
import Nav from "../components/Nav";
// import zipy from "zipyai";

// zipy.init("9134f15b");

export default function Home() {
  return (
    <div>
      <Head />
      <div>
        <Link href="/login" passHref>
          <button className="btn bg-blue100">
            <h3 className="text-2xl">Go to user Login</h3>
          </button>
        </Link>
        <Link href="/login" passHref>
          <button className="">
            <h3 className="text-2xl">Go to emp Login</h3>
          </button>
        </Link>
      </div>
      {/* <div className="w-full"></div> */}
    </div>
  );
}

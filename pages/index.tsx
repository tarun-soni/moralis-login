import styles from "../styles/Home.module.css";
import Head from "./api/components/Head";
import Link from "next/link";
import FileUpload from "../components/FileUpload";
import ImageCard from "../components/ImageCard";
// import zipy from "zipyai";

// zipy.init("9134f15b");

export default function Home() {
  return (
    <div className={styles.contianer}>
      <Head />
      <main>
        <Link href="/login" passHref>
          <button className="">
            <h3 className="text-2xl">Go to Login</h3>
          </button>
        </Link>
      </main>
      <div className="w-full"></div>
    </div>
  );
}

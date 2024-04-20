import React, { useEffect, useState, useRef } from "react";
import useCustomStyles from "../components/useCustomStyles";
import { CircularProgress, useTheme } from "@mui/material";
import CommonSection from "../components/commonSection";
import Header from "../components/Header/Header";
import { fetchUserAllUsers } from "../common/action/allUsersAction";
import { useDispatch, useSelector } from "react-redux";
import Theme from "../assets/css/theme";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import BuyerImage from "../assets/img/BuyerImage.png";
import notBuyerImage from "../assets/img/notBuyerImage.png";

const styles = (theme) => ({
  container: {
    background: `linear-gradient(-90deg,${Theme.COLOR_THEME_TWO} 10%, rgba(105, 179, 110) 100%)`,
    minHeight: "100vh",
    padding: "120px 40px 30px 40px",
  },
  homePage: {
    position: "relative",
    top: "0px",
    width: "100%",
    zIndex: 2,
  },
  all_users: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  eachUser: {
    background: "rgba(199, 240, 208,0.2)",
    padding: "15px",
    borderRadius: "10px",
    width: "250px",
    height: "150px",
    overflow: "hidden",
    position: "relative" /* Required for the transform */,
    transition:
      " transform 0.5s ease-in-out" /* Add transition for smooth rotation */,
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    "&:hover": {
      transform: "rotateY(180deg)",
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    },
    cursor: "pointer",
  },
  top: {
    textAlign: "center",
  },
  front: {
    position: "absolute" /* Position elements absolutely within the card */,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    flexDirection: "column",
  },
  buyer: {
    position: "absolute" /* Position elements absolutely within the card */,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden" /* Hide the back face by default */,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  buyer: {
    textAlign: "center",
    transform: "rotateY(180deg)",
  },
  noUserFound: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    color: "white",
    height: "50vh",
    fontSize: "25px",
    fontWeight: "600",
    fontFamily: '"Lato", sans-serif',
    fontStyle: "normal",
    opacity: 0.7,
  },
});

export default function Home() {
  const theme = useTheme();
  const classes = useCustomStyles(styles, theme);

  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);
  const [mergedUsers, setMergedUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (allUsers && allUsers.users && allUsers.users.users.length > 0) {
      const newUsers = [...mergedUsers, ...allUsers.users.users];
      const uniqueUsers = newUsers.reduce((map, user) => {
        map[user._id] = user;
        return map;
      }, {});
      const sortedUsers = Object.values(uniqueUsers).sort((a, b) =>
        a._id.localeCompare(b._id)
      );
      setMergedUsers(sortedUsers);
    }
  }, [allUsers]);

  function handleIntersection(entries) {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setPage((prevPage) => prevPage + 1);
    }
  }

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };
    const observer = new IntersectionObserver(handleIntersection, options);
    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }
    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [sentinelRef]);

  useEffect(() => {
    dispatch(fetchUserAllUsers({ limit: limit, page: page }));
  }, [page, limit]);

  return (
    <div className={classes?.container}>
      <CommonSection />
      <Header />

      <div className={classes?.homePage}>
        {mergedUsers.length > 0 ? (
          <div className={classes?.all_users}>
            {mergedUsers.map((user, index) => (
              <EachUsers classes={classes} key={user._id} data={user} />
            ))}
          </div>
        ) : (
          <div className={classes?.noUserFound}>No user found</div>
        )}

        <div ref={sentinelRef} style={{ height: "1px" }}></div>
        {allUsers.loading && (
          <div style={{ textAlign: "center", margin: "20px 0 20px 0" }}>
            <CircularProgress />
          </div>
        )}
      </div>
    </div>
  );
}

const EachUsers = ({ data, classes }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const fullName = data.firstName + " " + data.lastName;
  return (
    <div
      className={classes?.eachUser}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <div className={classes?.buyer}>
          {data.isBuyer ? (
            <>
              <div>
                <img
                  src={BuyerImage}
                  style={{ width: "100px", objectFit: "cover" }}
                />
              </div>
              <p style={{fontWeight:"700"}}>Buyer</p>
            </>
          ) : (
            <>
              <div>
                <img src={notBuyerImage} width="100" />
              </div>
            </>
          )}
        </div>
      ) : (
        <div className={classes?.front}>
          <div className={classes?.top}>
            <img
              src={
                data.proflePic ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ71Tc9Tk2q1eJUUlX1bXhWrc0-g8O9xnAplw&s"
              }
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "3px",
              }}
            >
              {data.isBuyer && (
                <div>
                  <ShoppingBagIcon style={{ fontSize: "20px" }} />
                </div>
              )}
              <div className="styledComponentTitle">
                {fullName.length > 15
                  ? `${fullName.slice(0, 15)}...`
                  : fullName}
              </div>
            </div>
            <div className="styledComponentSubTitle">
              {data.userName.length > 20
                ? data.userName.slice(0, 20)
                : data.userName}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


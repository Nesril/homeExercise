const HomePageStyle = {
  container: {
    zIndex: "12",
    color: "#FFFFFF",
  },
  
  title: {
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    color: "#383838",
    textDecoration: "none"
  },
  description:{
    color: "#383838",
    fontSize: 17
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px auto 0"
  },
  aboutUsParallax:{
    '@media(max-height: 3000px)': {
      height: '86vh'
    },
    '@media(max-height: 2200px)': {
      height: '80vh'
    },
    '@media(max-height: 1500px)': {
      height: '70vh'
    },
    '@media(max-height: 1100px)': {
      height: '62vh'
    },
    '@media(max-height: 1000px)': {
      height: '58vh'
    },
    '@media(max-height: 930px)': {
      height: '53vh'
    },
    '@media(max-height: 850px)': {
      height: '50vh'
    },
  },
  contactUsParallax:{
    '@media(max-height: 3000px)': {
      height: '88vh'
    },
    '@media(max-height: 2200px)': {
      height: '83vh'
    },
    '@media(max-height: 1500px)': {
      height: '74vh'
    },
    '@media(max-height: 1100px)': {
      height: '66vh'
    },
    '@media(max-height: 1000px)': {
      height: '61vh'
    },
    '@media(max-height: 930px)': {
      height: '59vh'
    },
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3",
    // height:'40vh',
    overflowY: 'auto', 
    scrollbarWidth: 'none', 
    msOverflowStyle: 'none',
    // '@media(max-height: 3000px)': {
    //   padding: '150px 0px',
    // },
    // '@media(max-height: 2200px)': {
    //   padding: '50px 0px'
    // },
  },
  mainRaised: {
    margin: "-98px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  }
};

export default HomePageStyle;

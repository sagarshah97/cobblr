# COBBLR

Our proposed project is Cobblr which represents a shoe retail company. The goal of this project is to develop an online website for a shoe retail business. The website will serve as an e-commerce platform where customers can browse and purchase a wide range of shoes. The primary objective is to create an engaging and user-friendly online shopping experience that showcases the footwear collection and drives sales. Cobblr recognizes that fashion knows no bounds and seeks to create a seamless online experience for individuals of all ages and fashion preferences. The website aims to provide a curated collection of classy and trendy shoes that resonate with contemporary boys and girls who actively follow fashion trends and value expressing their individuality through their choice of footwear.

- _Date Created_: 29 05 2023
- _Last Modification Date_: 11 08 2023
- _Git URL_: <https://git.cs.dal.ca/spshah/CSCI_5709_Group2_S23>
- _Netlify URL (Deployed site)_: <https://cobblr-store.netlify.app/>

## Authors

- [Sagar Paresh Shah](sg355741@dal.ca) (_B00930009_) - Full Stack Developer ([Individual Git Branch](https://git.cs.dal.ca/spshah/CSCI_5709_Group2_S23/-/tree/main-sagar?ref_type=heads))
- [Jayant Patidar](jy862746@dal.ca) (_B00934519_) - Full Stack Developer ([Individual Git Branch](https://git.cs.dal.ca/spshah/CSCI_5709_Group2_S23/-/tree/main-jayant-2?ref_type=heads))
- [Pratik Mukund Parmar](pratikparmar@dal.ca) (_B00934515_) - Full Stack Developer ([Individual Git Branch](https://git.cs.dal.ca/spshah/CSCI_5709_Group2_S23/-/tree/main-pratik?ref_type=heads))
- [Ashish Ojha](ashish.ojha@dal.ca) (_B00931967_) - Full Stack Developer ([Individual Git Branch](https://git.cs.dal.ca/spshah/CSCI_5709_Group2_S23/-/tree/main-ashish?ref_type=heads))
- [Aayush Yogesh Pandya](ay923755@dal.ca) (_B00939670_) - Full Stack Developer ([Individual Git Branch](https://git.cs.dal.ca/spshah/CSCI_5709_Group2_S23/-/tree/main-aayush?ref_type=heads))
- [Sahil Dilip Dalvi](sahil.dalvi@dal.ca) (_B00939343_) - Full Stack Developer ([Individual Git Branch](https://git.cs.dal.ca/spshah/CSCI_5709_Group2_S23/-/tree/main-sahil?ref_type=heads))

## Deployment

### Getting started

- The following command has been used to create the React app with boilerplate code:
  - `npx create-react-app cobblr`

## Pre-requisites

- Download and install [Node.js](https://nodejs.org/en/download)
- Clone this repository.
- To run this on the local server:

  - - Comment the following lines in `frontend/src/App.js`:

      ```
      axios.defaults.baseURL = "https://cobblr-store-api.netlify.app/.netlify/functions/index";
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

      ```

  - - Uncomment the following line:

      ```
      axios.defaults.baseURL = "http://localhost:8000";

      ```

  - - Comment the following lines in `backend/functions/index.js`:

      ```
      app.use("/.netlify/functions/index", router);
      app.get("/.netlify/functions/index/health-check", healthCheck);

      ```

  - - Uncomment the following line:

      ```
      app.use("/", router);
      app.get("/health-check", healthCheck);

      ```

- Type the following commands after opening this folder and navigating to `frontend` and `backend` in VSCode:
  - `npm install`
  - `npm start`

## Frontend and Backend Deployment

- The frontend and backend has been deployed to [Netlify](https://app.netlify.com/).
- This deployment is supported via CI/CD on the main branch and YML file can be found at `.gitlab-ci.yml`.

## Built With

- [React](https://reactjs.org/) - Web framework
- [React Material UI](https://mui.com/material-ui/) - Web Component Library
- [React Router DOM](https://reactrouter.com/en/main) - Library for routing through different pages
- [Node.js](https://nodejs.org/en/) - Open source runtime environment
- [Express.js](https://expressjs.com/) - Node.js web application framework that provides HTTP utility methods and middleware for creating a robust API
- [Mongoose](https://mongoosejs.com/docs/) - Object mapping package between MongoDB and Backend schema
- [Mongodb](https://www.mongodb.com/)- Data storage

## Sources Used

### frontend/src/views/AdditionalProductDetail/index.js

### frontend/src/views/Admin/AvailableQuantitiesModal.js

### frontend/src/views/Admin/ImageModal.js

### frontend/src/views/Admin/index.js

### frontend/src/views/BillingDetails/index.js

### frontend/src/views/ContactUs/ContactUs.js

### frontend/src/views/CustomerReviews/DisplayReviews.js

### frontend/src/views/ForgotPassword/index.js

### frontend/src/views/FAQ/index.js

### frontend/src/views/HomePage/Footer.js

### frontend/src/views/HomePage/index.js

### frontend/src/views/HomePage/MyCarousel.js

### frontend/src/views/HomePage/shop.js

### frontend/src/views/Login/index.js

### frontend/src/views/OrderConfirmation/index.js

### frontend/src/views/Payment/PaymentPage.js

### frontend/src/views/ProductDetail/index.js

### frontend/src/views/Profile/index.js

### frontend/src/views/Register/index.js

### frontend/src/views/ShoppingCart/index.js

### frontend/src/views/SimilarProducts/index.js

### frontend/src/views/Stores/index.js

### frontend/src/views/Wishlist/index.js

```
<Accordion></Accordion>
<AccordionSummary></AccordionSummary>
<AccordionDetails></AccordionDetails>
<Alert></Alert>
<Box></Box>
<Button></Button>
<Container></Container>
<Card></Card>
<CardActions></CardActions>
<CardContent></CardContent>
<CardMedia></CardMedia>
<Carousel></Carousel>
<Chip></Chip>
<Col></Col>
<Dialog></Dialog>
<DialogActions></DialogActions>
<DialogTitle></DialogTitle>
<DialogContent></DialogContent>
<Dropdown></Dropdown>
<Grid></Grid>
<Link></Link>
<List></List>
<Modal></Modal>
<Navbar></Navbar>
<Paper></Paper>
<RadioGroup></RadioGroup>
<Row></Row>
<Snackbar></Snackbar>
<Select></Select>
<ToastContainer></ToastContainer>
<Toast></Toast>
<TextField></TextField>
<Typography></Typography>

```

- The above tags (CSS components) in [React MUI](https://mui.com/material-ui/getting-started/overview/) were implemented in their official documentation.
- [React MUI](https://mui.com/material-ui/getting-started/overview/)'s Code was used as a CSS framework and a reference to understand how to implement different elements such as Button, Grid, TextField, Card, Snackbar, and Alert on the UI in React.
- [React MUI](https://mui.com/material-ui/getting-started/overview/)'s component code was heavily modified by adding custom logic, styling, onChange and onClick behaviors and have been used at multiple instances in the sources mentioned above.
- [Material UI](https://github.com/mui/material-ui/tree/v5.13.5/docs/data/material/getting-started/templates/sign-in-side) template was referred for login and sign up pages and modified according to our needs.

### frontend/src/views/Payment/index.js

_Lines 9 - 20_

```
const PaymentContainer = () => {
  const location = useLocation();
  const params = location.state?.params;

  return (
    <>
      <Elements stripe={stripePromise}>
        <PaymentPage details={params} />
      </Elements>
      <Footer />
    </>
  );

```

- The above code has been adapted from [Stripe](https://stripe.com/docs/stripe-js/react) which is implemented in their official documentation.
- [Stripe](https://stripe.com/docs/stripe-js/react)'s code was used as a reference to understand on how to integrate stripe payment gateway in our application in React.
- [Stripe](https://stripe.com/docs/stripe-js/react)'s code was modified by writing the custom template as per the requirements.

### backend/app/components/filter/filter.route.js

_Lines 13 - 18_

```
router
  .route("/filterShoes")
  .post(
    validate(filterValidation.filterShoes),
    filterController.filterShoes.bind(filterController)
  );

```

The code above was created by adapting the code in [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes) as shown below:

```
// Home page route.
router.get("/", function (req, res) {
  res.send("Wiki home page");
});


```

- The code for [Routing](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes) was implemented in MDN Web Docs Example.
- [Routing](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes)'s Code was used to get reference on how to implement routing in node and express.
- [Routing](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes)'s Code was modified by adding custom routing logic.

### backend/app/components/shoes/shoes.model.js

_Lines 4 - 24_

```
const Shoe = new Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    subText: { type: String, required: true },
    shortDescription: { type: String, required: true },
    price: { type: Number, required: true },
    color: { type: String, required: true },
    availableQuantity: [{ size: String, quantity: Number }],
    images: [{ name: String, data: String }],
    briefDescription: { type: String, required: true },
    brand: { type: String, required: true },
    tags: [String],
    category: { type: String, required: true },
    gender: { type: String, required: true },
    type: { type: String, required: true },
    material: { type: String, required: true },
    availability: { type: Boolean, required: true },
  },
  { timestamps: true }
);

```

- The above schema has been adapted from [Mongoose Schemas](https://mongoosejs.com/docs/guide.html) which is implemented in their official documentation.
- [Mongoose Schemas](https://mongoosejs.com/docs/guide.html)'s code was used as a reference to understand on how to implement schemas in MongoDB.
- [Mongoose Schemas](https://mongoosejs.com/docs/guide.html)'s code was modified by writing the custom schema as per the requirements.

### backend/app/components/shoes/shoes.validation.js

_Lines 5 - 26_

```
const validationSchema = {
  _id: Joi.string().min(1).required(),
  _ids: Joi.array().items(Joi.string()),
  code: Joi.string().min(1).required(),
  name: Joi.string().min(3).max(100).required(),
  subText: Joi.string().min(3).required(),
  shortDescription: Joi.string().min(3).required(),
  price: Joi.number().min(3).max(10).required(),
  color: Joi.string().min(1).max(100).required(),
  thumbnail: Joi.string().min(3),
  sizes: Joi.array().items(Joi.string()),
  quantity: Joi.array().items(Joi.number()),
  images: Joi.array().items(Joi.string()),
  briefDescription: Joi.string().min(3).required(),
  brand: Joi.string().min(3),
  tags: Joi.array().items(Joi.string()),
  category: Joi.string().min(1).required(),
  gender: Joi.string().min(1).required(),
  type: Joi.string().min(1).required(),
  material: Joi.string().min(1).required(),
  availability: Joi.boolean().required(),
  sortValue: Joi.string()
    .valid("sort1", "sort2", "sort3")
    .default("sort1")
    .required(),
  selectedFilters: Joi.object().pattern(/^.*$/, Joi.string()),
  currentPage: Joi.number().default(1).optional(),
  searchKeyword: Joi.string().allow("", null).optional(),
  pageChangeType: Joi.string().allow("", null).optional(),
};

```

- The above validation schema has been adapted from [JOI](https://joi.dev/api/?v=17.9.1) which is implemented in their official documentation.
- [JOI](https://joi.dev/api/?v=17.9.1)'s code was used as a reference to understand on how to implement validation on API request bodies.
- [JOI](https://joi.dev/api/?v=17.9.1)'s code was modified by writing the custom validation schema as per the requirements.

### backend/app/components/wishlist/wishlist.validation.js

```
const validationSchema = {
  _id: Joi.string().min(1).required(),
};

```

- The above validation schema has been adapted from [JOI](https://joi.dev/api/?v=17.9.1) documentation.

- [Swiper](https://swiperjs.com/demos#css-mode) - Effect coverflow has been used for the carrousel on the homepage
- [Mongoose Schemas](https://mongoosejs.com/docs/guide.html)'s code was used as a reference to understand on how to implement schemas in MongoDB.
- [JOI](https://joi.dev/api/?v=17.9.1)'s code was used as a reference to understand on how to implement validation on API request bodies.

### Additional packages

- [Framer Motion](https://www.npmjs.com/package/framer-motion) was used to animate the transitions between pages.
- [React Responsive Carousel](https://www.npmjs.com/package/react-responsive-carousel) was used to implement customizable carousel component.
- [React Router DOM](https://www.npmjs.com/package/react-router-dom) was used for navigation.
- [React Icons](https://react-icons.github.io/react-icons/) were used for the icons.
- [Swiper](https://swiperjs.com/) was used for carrousel.
- [jsPDF](https://www.npmjs.com/package/jspdf) was used to generate PDF for invoices to be downloaded by the customer.
- [React Google Maps](https://www.npmjs.com/package/@react-google-maps/api) was used to integrate maps into store locator.
- [React Stripe JS](https://www.npmjs.com/package/@stripe/react-stripe-js) was used to integrate Stripe payment gateway as library components.
- [Stripe JS](https://www.npmjs.com/package/@stripe/stripe-js) was used to integrate utility modules of the Stripe components.
- [Bcrypt](https://www.npmjs.com/package/bcrypt) was used for password hashing.
- [Sendgrid/mail](https://www.npmjs.com/package/@sendgrid/mail) was used to send mail for password reset.

## Images

- [Nike](https://www.nike.com/ca/t/go-flyease-easy-on-off-shoes-4bM44t/DR5540-102)
- [FAQ Image](https://www.canva.com/)
- [Contact Image](https://www.canva.com/)
- [Profile Image](https://www.flaticon.com/free-icon/profile_3135715#)
- [Home Page - Sneaker Swap](https://www.sneakerswapevents.com/)
- [Home Page - Freepik](https://www.freepik.com/)
- [Home Page - Dribble](https://dribbble.com/shots/15532992-Nike-Air-Force-1)

## Icons

All icons are adapted from [React Material Icons Library](https://mui.com/material-ui/material-icons/)

- [Search](https://mui.com/material-ui/material-icons/?query=Search)
- [ExpandMore](https://mui.com/material-ui/material-icons/?query=ExpandMore)
- [Lock](https://mui.com/material-ui/material-icons/?query=Lock)
- [Favorite](https://mui.com/material-ui/material-icons/?query=favorite)
- [ShoppingBag](https://mui.com/material-ui/material-icons/?query=shopping+bag)
- [LockOpen](https://mui.com/material-ui/material-icons/?query=lock+open)
- [Instagram](https://mui.com/material-ui/material-icons/?query=instagram)
- [Facebook](https://mui.com/material-ui/material-icons/?query=facebook)
- [Twitter](https://mui.com/material-ui/material-icons/?query=twitter)

## Acknowledgement

The UI has been inspired from [Nike](https://www.nike.com/ca)

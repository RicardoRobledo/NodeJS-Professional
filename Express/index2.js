const express = require("express");
const tweetsRouter = require("./routes/tweetsRouter");
const config = require("./config");
const helmet = require("helmet");
const cors = rquire("cors");
const { logErrors, wrapErrors, errorHandler } = require("./utils/middlewares/errorMiddlewares");
const notFound = require('./utils/middlewares/notFoundMiddleware');

const app = express();
const port = config.port;


// Global middlewares
app.use(helmet());
app.use(cors({ origin: config.dev ? "*" : config.corsOrigin }));
app.use(express.json());

//app.use("/tweets", tweetsRouter);
tweetsRouter(app);

// Catch 404
app.use(notFound);

// Error middlewares
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`);
});
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PostController_1 = require("./controller/PostController");
const BookController_1 = require("./controller/BookController");
/**
 * All application routes.
 */
exports.AppRoutes = [
    {
        path: "/posts",
        method: "get",
        action: PostController_1.postGetAllAction
    },
    {
        path: "/books",
        method: "get",
        action: BookController_1.saveAndGetBook
    }
];
//# sourceMappingURL=routes.js.map
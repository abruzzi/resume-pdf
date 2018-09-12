#!/bin/bash

inliner -ni resumes/index.html > resumes/index.result.html
node export.js
open index.pdf
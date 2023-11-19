#!/usr/bin/env zx
import { $ } from 'zx'

const developPackage = JSON.parse(await $`cat package.json`)
const developVersion = developPackage.version

await $`gh release create ${developVersion} -t ${developVersion}`

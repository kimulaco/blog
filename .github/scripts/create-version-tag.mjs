#!/usr/bin/env zx
import { $ } from 'zx'

const developPackage = JSON.parse(await $`cat package.json`)
const developVersion = developPackage.version

await $`git tag -a ${developVersion} -m "Release ${developVersion}"`
await $`git push origin ${developVersion}`

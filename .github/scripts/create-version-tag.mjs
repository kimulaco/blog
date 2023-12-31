#!/usr/bin/env zx
import { $ } from 'zx'

const developPackage = JSON.parse(await $`cat package.json`)
const developVersion = developPackage.version

const prs = JSON.parse(
  await $`gh pr list --repo $GITHUB_REPOSITORY --search "'${developVersion}' in:title" -s all --json url`
)

const description = prs.map((pr) => `- (${pr.url})`).join('\n')

await $`gh release create ${developVersion} -t ${developVersion} -n "${description}" --latest`

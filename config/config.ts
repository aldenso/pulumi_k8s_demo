import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();

export const zone = config.get('zone');

export const region = config.get('region') || 'us-central1';

export const project = config.get('project') || 'gdcdevops';

export const nodes = config.getNumber('nodes') || 1;

export const ipcidrrange = config.get('ipcidrrange') || '10.2.1.0/24';

export const domain = config.get('domain');

export const subdomain = config.get('subdomain');
CREATE TABLE `location_snapshot` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`latitude` real NOT NULL,
	`longitude` real NOT NULL,
	`timestamp` integer DEFAULT (unixepoch()) NOT NULL,
	`count` integer DEFAULT 1 NOT NULL,
	`synced` integer DEFAULT false NOT NULL
);

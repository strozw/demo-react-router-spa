CREATE TABLE `books` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`author` text NOT NULL,
	`isbn` text NOT NULL,
	`published_year` integer NOT NULL,
	`genre` text NOT NULL,
	`description` text NOT NULL,
	`cover_url` text,
	`status` text DEFAULT 'available' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `books_isbn_unique` ON `books` (`isbn`);
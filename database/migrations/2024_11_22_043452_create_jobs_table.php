<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->string('title', 225);
            $table->string('category');
            $table->text('description');
            $table->text('qualifications');
            $table->string('city_id');
            $table->string('full_address');
            $table->string('schedule');
            $table->decimal('payment', 10, 2);
            // $table->string('employer_name'); // Optional: remove if always derived from user
            // $table->string('employer_contact'); // Optional: remove if always derived from user
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Reference to users table
            $table->json('media_paths');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('jobs');
    }
};

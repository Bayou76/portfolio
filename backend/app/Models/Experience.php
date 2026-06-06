<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $fillable = [
        'company', 'role', 'location',
        'start_date', 'end_date', 'description', 'order'
    ];
}